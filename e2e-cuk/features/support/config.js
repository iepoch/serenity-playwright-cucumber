const { configure, ArtifactArchiver } = require( "@serenity-js/core");
const { SerenityBDDReporter } = require ("@serenity-js/serenity-bdd");

configure({
  crew: [
    // ... reporting services
    new SerenityBDDReporter(),
    ArtifactArchiver.storingArtifactsAt("./target/site/serenity"),
  ],
});
