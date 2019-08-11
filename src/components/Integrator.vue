<template>
    <div class="meme">
        <div class="meme-input">
            <div class="meme-input-fields">
                <input v-model="topText" placeholder="Top text"/>
                <input v-model="bottomText" placeholder="Bottom text"/>
            </div>
            <div class="meme-input-buttons">
                <button :disabled="!topText && !bottomText" @click="clear">Clear</button>
                <button :disabled="topText.length < 3" @click="match">Match!</button>
            </div>
        </div>
        <div class="meme-result">
            <img v-if="$store.getters.src" v-bind:src="$store.getters.src"/>
            <div class="meme-result-placeholder">{{ $store.getters.imgPlaceholderText }}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

var store = {
    debug: true,
    memes: [],
    state: {
        memeSrc: null,
        message: false
    },
    getMemeSrc () {
        return this.state.memeSrc
    },
    setMemeSrc (newSrc) {
        return this.state.memeSrc = newSrc
    },
    setMessageAction (newValue) {
        if (this.debug) console.log('setMessageAction triggered with', newValue)
        this.state.message = newValue
    },
    clearMessageAction () {
        if (this.debug) console.log('clearMessageAction triggered')
        this.state.message = ''
    }
}

export default {
    name: 'Integrator',

    data: () => {
        return {
            topText: '',
            bottomText: ''
        }
    },

    created() {
        window.logging = () => {
            store.debug = !store.debug
            console.log("Debugging ", store.debug ? 'activated' : 'deactivated')
        }

        if (localStorage.getItem('memes')) {
            store.memes = JSON.parse(localStorage.getItem('memes'))
        } else {
            axios.get('/api/get_memes.js')
                .then( (response) => {
                    store.memes = response.data
                    localStorage.setItem('memes', JSON.stringify(store.memes))
                })
                .catch( (error) => {
                    console.error(error)
                })
        }
    },

    methods: {

        clear() {
            this.topText = ''
            this.bottomText = ''
        },

        match() {
            this.$store.commit('loading')

            let split = this.topText.split(' ')
            let matches = {}
            let bestMatch = {
                id: 0,
                count: 0
            }

            /*
             *   loop through all memes and find the most
             *   relevant match by increasing count for
             *   each match
             */
            store.memes.map( (meme) => {
                for (const word of split) {
                    if (word.length > 2 && meme.name.toLowerCase().indexOf(word.toLowerCase()) > -1) {
                        if (typeof matches[meme.id] !== 'undefined') {
                            matches[meme.id].count++

                            if (matches[meme.id].count > bestMatch.count) {
                                bestMatch.id = meme.id
                                bestMatch.count = matches[meme.id].count
                            }
                        } else {
                            matches[meme.id] = {
                                count: 1
                            }

                            if (matches[meme.id].count > bestMatch.count) {
                                bestMatch.id = meme.id
                                bestMatch.count = matches[meme.id].count
                            }
                        }
                    }
                }
            })

            if (bestMatch.id) {
                if (store.debug) console.log('Most relevant id ', bestMatch.id)
            } else if (!store.memes.length) {
                if (store.debug) console.log('The meme list is empty!')
            } else {
                let memeCount = store.memes.length - 1
                let randomIndex = Math.floor(Math.random() * Math.floor(memeCount))
                bestMatch.id = store.memes[randomIndex].id

                if (store.debug) console.log('Did not find a relevant id, faking a random one ', bestMatch.id)
            }

            this.generateMeme(bestMatch.id)
        },

        generateMeme(memeId) {
            axios.get('/api/generate.js', {
                    params: {
                        template_id: memeId,
                        text0: this.topText,
                        text1: this.bottomText,
                        username: process.env.VUE_APP_USERNAME,
                        password: process.env.VUE_APP_PASSWORD
                    }
                })
                .then( (response) => {
                    this.$store.commit('change', response.data)
                })
                .catch( (error) => {
                    console.error(error)
                })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.meme {
    display: flex;
    justify-content: space-around;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
}
.meme-input,
.meme-result {
    width: 50%;
}
.meme-input {
    padding: 40px;
}
.meme-input input,
.meme-input button {
    margin: 4px;
    padding: 4px;
    font-size: 1.2rem;
    border: 0;
    border-radius: 4px;
    flex-grow: 1;
}
.meme-result {
    min-height: 110px;
    background-color: rgba(255,255,255,0.3);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.meme-result-placeholder:last-child:not(:first-child) {
    display: none;
}
.meme-result img {
    margin: 0 auto;
    max-width: 10%;
    box-shadow: 2px 2px 10px 1px #999;
    animation: expand 1s ease forwards;
}
.meme-input-fields {
    display: flex;
    flex-direction: column;
}
.meme-input-buttons {
    display: flex;
    justify-content: space-between;
}
@media (max-width: 768px), (max-height: 550px) {
    .meme {
        flex-direction: column;
    }
}
@keyframes expand {
    100% {
        max-width: 100%;
    }
}
</style>
