<template>
  <div class="row justify-around">
    <q-card v-for="support in supports" inline class="col-11">
      <q-card-media v-if="support.img">
        <img :src="support.img" style="width: 200px">
      </q-card-media>
      <q-card-title>
        {{support.title}}
        <span slot="subtitle">{{support.subtitle}}</span>
        <div slot="right" class="row items-center">
          <q-icon name="timeline"/> {{support.version}}
        </div>
      </q-card-title>
      <q-card-main>
        <p class="text-faded">{{support.detail}}</p>
      </q-card-main>
      <q-card-separator/>
      <q-card-actions align="around">
        <q-btn color="primary" flat round small icon="share" @click="share"/>
        <a :href="support.url" target="_blank">
          <q-btn color="positive" v-if="support.url" flat round small icon="open_in_new"/>
        </a>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        supports: [
          {
            title: "Celery", subtitle: "Distributed Task Queue.",
            url: "http://docs.celeryproject.org/en/latest/index.html", version: "4.1",
            img: "http://docs.celeryproject.org/en/latest/_static/celery_512.png",
            detail: "Celery is a simple, flexible, and reliable distributed system to process vast amounts of messages, " +
            "while providing operations with the tools required to maintain such a system." +
            "It’s a task queue with focus on real-time processing, while also supporting task scheduling.",
          },
          {
            title: "Channel", subtitle: "Websocket support for django",
            url: "https://channels.readthedocs.io/en/latest/", version: "1.1.6",
            detail: "Channels extends Django to add a new layer that allows two important features:\n\n" +
            "WebSocket handling, in a way very similar to normal views\n" +
            "Background tasks, running in the same servers as the rest of Django\n" +
            "It allows other things too, but these are the ones you’ll use to start with."
          },
          {
            title: "Django", subtitle: "The web framework for perfectionists with deadlines.",
            url: "https://www.djangoproject.com", version: "1.11",
            detail: "Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design." +
            "Built by experienced developers, it takes care of mush of the hassle of Web development, " +
            "so you can focus on writing your app without needing to reinvent the wheel. It's free and open source.",
          },
          {
            title: "Django REST framework", subtitle: "Django REST framework is a powerful and flexible toolkit for building Web APIs.",
            url: "http://www.django-rest-framework.org/", version: "3.7.7",
            img: "http://www.django-rest-framework.org/img/logo.png",
            detail: "Some reasons you might want to use REST framework:\n\n" +
            "The Web browsable API is a huge usability win for your developers.\n" +
            "Authentication policies including packages for OAuth1a and OAuth2.\n" +
            "Serialization that supports both ORM and non-ORM data sources.\n" +
            "Customizable all the way down - just use regular function-based views if you don't need the more powerful features.\n" +
            "Extensive documentation, and great community support.\n" +
            "Used and trusted by internationally recognised companies including Mozilla, Red Hat, Heroku, and Eventbrite."
          },
          {
            title: "Python", subtitle: "These are some of the reasons people who use Python would rather not use anything else",
            url: "https://www.python.org", version: "3.6.1", img: "https://www.python.org/static/img/python-logo.png",
            detail: "Python is powerful and fast; play well with others; runs everywhere; is friendly and easy to learn; is Open."
          },
          {
            title: "Postgresql", subtitle: "The world's most advanced open source database",
            url: "https://www.postgresql.org/", version: "9.6.3", img: "https://www.postgresql.org/media/img/layout/hdr_left.png",
            detail: "PostgreSQL is a powerful, open source object-relational database system. " +
            "It has more than 15 years of active development and a proven architecture that has earned it a strong reputation for reliability, data integrity, and correctness. " +
            "It runs on all major operating systems, including Linux, UNIX (AIX, BSD, HP-UX, macOS, Solaris), and Windows."
          },
          {
            title: "Quasar Framework", subtitle: "Empowering your websites and apps",
            url: "https://www.python.org", version: "0.14.7", img: "http://quasar-framework.org/images/responsive-logo.png",
            detail: "Build responsive weibsties, PWAs, hybrid mobile Apps (that look native!) and Electron apps, all simultaneously using same codebase, powered with Vue."
          },
          {
            title: "Redis", subtitle: "Redis is an open source (BSD licensed), in-memory data structure storeused as a database, cache and message broker. ",
            url: "https://redis.io", version: "3.2.9", img: "https://redis.io/images/redis-white.png",
            detail: "It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs and geospatial indexes with radius queries. " +
            "Redis has built-in replication, Lua scripting, LRU eviction, transactions and different levels of on-disk persistence, " +
            "and provides high availability via Redis Sentinel and automatic partitioning with Redis Cluster."
          },
          {
            title: "Vue", subtitle: "The Progressive JavaScript Framework",
            url: "https://www.vuejs.org", version: "2.0", img: "https://www.vuejs.org/images/logo.png",
            detail: "Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. " +
            "Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. " +
            "The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. " +
            "On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries."
          },
        ]
      }
    },
    methods: {
      share() {
        console.log("waiting for support")
      }
    }
  }
</script>

