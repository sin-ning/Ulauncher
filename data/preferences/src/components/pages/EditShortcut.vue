<template>
  <div class="page" v-if="prefsLoaded">
    <b-media>
      <div :class="{'icon-container': true, 'no-icon': !localIcon}" slot="aside" @click="selectIcon">
        <img v-if="localIcon" :src="expandUserPath(localIcon)">
      </div>

      <b-form-fieldset
        label="Name"
        :state="nameState"
        >
        <b-form-input class="name" v-model="localName"></b-form-input>
      </b-form-fieldset>

      <b-form-fieldset
        label="Keyword"
        :state="keywordState"
        >
        <b-form-input class="keyword" v-model="localKeyword"></b-form-input>
      </b-form-fieldset>

      <b-form-fieldset
        label="Query or Script"
        :state="cmdState"
        >
        <b-form-input class="cmd" textarea :rows="3" v-model="localCmd"></b-form-input>
        <small class="form-text text-muted">
          <p>
            Use <code>%s</code> as a placeholder for a query in URL or write a script in a language of your choice.
            <a @click.prevent="cmdDescriptionExpanded = !cmdDescriptionExpanded"
               href="">(toggle example)</a>
          </p>
          <div v-if="cmdDescriptionExpanded">
            <pre class="selectable"><code>#!/usr/bin/env node
// query is passed as a first argument
console.log("Query is:", process.argv[1]);</code></pre>
          </div>
        </small>
      </b-form-fieldset>

      <b-form-checkbox v-model="localIsDefaultSearch">
        Default search (suggest this shortcut when no results found)
      </b-form-checkbox>

      <b-button-toolbar>
        <b-button class="save" variant="primary" href="" @click="save">Save</b-button>
        <b-button class="cancel" variant="secondary" href="" @click="hide">Cancel</b-button>
      </b-button-toolbar>
    </b-media>

  </div>
</template>


<script>
import jsonp from '@/api'
import bus from '@/event-bus'
import { mapState, mapGetters } from 'vuex'

const shortcutIconEventName = 'shortcut-icon-event'

export default {
  name: 'edit-shortcut',
  props: ['id', 'icon', 'name', 'keyword', 'cmd', 'is_default_search'],
  created () {
    bus.$on(shortcutIconEventName, this.onIconSelected)
  },
  beforeDestroy () {
    bus.$off(shortcutIconEventName, this.onIconSelected)
  },
  data () {
    return {
      localIcon: this.icon,
      localName: this.name,
      localKeyword: this.keyword,
      localCmd: this.cmd,
      localIsDefaultSearch: !!this.is_default_search,
      validate: false,
      cmdDescriptionExpanded: false
    }
  },
  computed: {
    ...mapState(['prefs']),
    ...mapGetters(['prefsLoaded']),
    nameState () {
      return this.validate && !this.localName ? 'danger' : ''
    },
    keywordState () {
      return this.validate && !this.localKeyword ? 'danger' : ''
    },
    cmdState () {
      return this.validate && !this.localCmd ? 'danger' : ''
    }
  },
  methods: {
    expandUserPath (path) {
      return path.indexOf('~') === 0 ? path.replace('~', this.prefs.env.user_home, 1) : path
    },
    selectIcon () {
      jsonp('prefs://show/file-browser', {type: 'image', name: shortcutIconEventName})
        .then(null, (err) => bus.$emit('error', err))
    },
    onIconSelected (data) {
      this.localIcon = data.value
    },
    save () {
      this.validate = true
      if (!this.localName || !this.localKeyword || !this.localCmd) {
        return
      }

      let shortcut = {
        id: this.id || '',
        icon: this.localIcon || '',
        name: this.localName,
        keyword: this.localKeyword.trim(),
        cmd: this.localCmd,
        is_default_search: this.localIsDefaultSearch
      }
      let method = shortcut.id ? 'update' : 'add'
      jsonp('prefs://shortcut/' + method, shortcut)
        .then(this.hide, (err) => bus.$emit('error', err))
    },
    hide () {
      this.$router.push({path: '/shortcuts'})
    }
  }
}
</script>

<style lang="scss" scoped>
.page { padding: 15px }
.row {display: block;}
.name, .keyword { width: 400px }
.save, .cancel {
  margin-right: 20px;
  margin-top: 20px;
  cursor: pointer
}
.icon-container {
  cursor: pointer;
  width: 120px;
  height: 100px;
  box-sizing: border-box;
  padding-top: 37px;
  position: relative;

  img {
    display: block;
    width: 100px;
    height: 100px;
    margin-left: 10px;
  }

  &:hover:before,
  &.no-icon:before {
    z-index: 1;
    content: "\f093";
    font: 64px FontAwesome;
    display: block;
    position: absolute;
    left: 10px;
    top: 36px;
    width: 100px;
    height: 100px;
    border: 1px solid #555;
    color: #555;
    text-align: center;
    line-height: 100px;
  }
  &.no-icon:after {
    content: "Click to select icon";
    font-size: 0.7em;
    display: block;
    position: absolute;
    text-align: center;
    width: 100px;
    left: 10px;
    top: 140px;
  }
  &.no-icon.validate:before {
    color: #d9534f;
  }
  &.no-icon.validate:after {
    content: "Please select an icon";
    font-weight: bold;
  }

}
</style>
