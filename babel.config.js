module.exports = {
  presets: [
    ["@babel/preset-env", {
      targets: "last 2 versions, ie 11",
    }],
    ["@babel/preset-react"],
    ["@babel/preset-typescript"]
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-react-display-name",
    "@babel/plugin-proposal-class-properties",
    "babel-plugin-macros"
  ]
};
