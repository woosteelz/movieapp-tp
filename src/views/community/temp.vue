<template>
  <v-layout row wrap align-center>
    <v-flex xs8 offset-md2>
      <div v-for="article in articles" :key="article.title">
        <v-card class="my-3" hover>
          <v-container fill-height fluid>
            <v-layout>
              <v-flex xs12 align-end d-flex>
                <span class="headline">{{ article.title }}</span>
              </v-flex>
            </v-layout>
          </v-container>

          <v-card-text>
            {{ article.description }}
          </v-card-text>
          <v-card-actions>
            <v-chip small color="secondary" class="white--text">
              <!-- {{ article.source.name }} -->
            </v-chip>
            <v-spacer></v-spacer>
            <!-- <v-btn icon class="red--text">
              <v-icon small>fa-reddit</v-icon>
            </v-btn>
            <v-btn icon class="light-blue--text">
              <v-icon small>fa-twitter</v-icon>
            </v-btn>
            <v-btn icon class="blue--text text--darken-4">
              <v-icon small>fa-facebook</v-icon>
            </v-btn>
            <v-btn icon class="red--text">
              <v-icon small>fa-google-plus</v-icon>
            </v-btn>
            <v-btn icon class="blue--text text--darken-4">
              <v-icon small>fa-linkedin</v-icon>
            </v-btn> -->
            <v-spacer></v-spacer>

            <v-btn
              small
              replace
              color="info"
              v-bind:href="article.url"
              target="_blank"
              >Read More</v-btn
            >
          </v-card-actions>
        </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      articles: [
        {
          title: "test",
          urlToImage:
            "https://image.tmdb.org/t/p/w500/i8CQIAEAjkieDIA88b4gh122h8s.jpg",
          description: "test content",
        },
      ],
    };
  },
};
</script>
