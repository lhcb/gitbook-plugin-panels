const { State } = require('markup-it');
const markdown = require('markup-it/lib/markdown');
const html = require('markup-it/lib/html');

function parseMarkdown(text, debug) {
  const latexMatcher = /(\$\$[\s\S][^$]+\$\$)/g;
  const latexPlaceholder = 'LATEXPLACEHOLDER';
  const matches = text.match(latexMatcher);
  const textWithoutLatex = text.replace(latexMatcher, latexPlaceholder);

  const mdState = State.create(markdown);
  const document = mdState.deserializeToDocument(textWithoutLatex);
  const htmlState = State.create(html);
  var str = htmlState.serializeDocument(document);

  if (matches !== null) {
    for (var i = 0; i < matches.length; i++) {
      str = str.replace(latexPlaceholder, '$$' + matches[i] + '$$');
    }
  }

  return str;
};

function panel(block, type) {
  var s  = '<div class="panel panel-' + type + '">';
  if (block.args.length > 0) {
    s += '<div class="panel-heading">';
    s += '<h3 class="panel-title">';
    s += block.args[0];
    s += "</h3>";
    s += "</div>";
  }
  s += '<div class="panel-body">';
  s += parseMarkdown(block.body);
  s += "</div>";
  s += "</div>";
  return s;
}

module.exports = {
  website: {
    assets: "./assets",
    css: [
      "panels.css"
    ]
  },

  blocks: {
    // Block names that match Bootstrap classes
    panel: {
      process: function(block) {
        return panel(block, 'default');
      }
    },
    panel_primary: {
      process: function(block) {
        return panel(block, "primary");
      }
    },
    panel_success: {
      process: function(block) {
        return panel(block, "success");
      }
    },
    panel_warning: {
      process: function(block) {
        return panel(block, "warning");
      }
    },
    panel_danger: {
      process: function(block) {
        return panel(block, "danger");
      }
    },
    // Block names that match what we used in the SWC templates
    callout: {
      process: function(block) {
        return panel(block, "primary");
      }
    },
    challenge: {
      process: function(block) {
        parseMarkdown(block.body, true);
        return panel(block, "success");
      }
    },
    objectives: {
      process: function(block) {
        return panel(block, "warning");
      }
    }
  }
};
