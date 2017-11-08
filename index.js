var marked = require('marked');
// var output = require('lib/output');

function parseMarkdown(text, debug) {
  const latexMatcher = /(\$\$[\s\S][^$]+\$\$)/g;
  const latexPlaceholder = 'LATEXPLACEHOLDER';
  const matches = text.match(latexMatcher);
  const textWithoutLatex = text.replace(latexMatcher, latexPlaceholder);

  var str = marked(textWithoutLatex);

  if (matches !== null) {
    for (var i = 0; i < matches.length; i++) {
      str = str.replace(latexPlaceholder, '$$' + matches[i] + '$$');
    }
  }

  return str;
};

/* `icon` is the name of a Font Awesome icon class. */
function panel(output_type, block, type, icon, hide=false) {
  // Generate a random id so blocks can be collapsed
  var id = Math.floor(Math.random()*10000000000);

  var s  = '<div class="panel panel-' + type + '">';
  if (block.args.length > 0) {
    var expandable = hide && output_type == 'website';
    s += '<div class="panel-heading">';
    s += '<h3 class="panel-title" onclick="javascript:toggle('+id+');">';
    if (icon !== undefined) {
      s += '<i class="fa fa-' + icon + '">';
      s += "</i> ";
    }
    s += block.args[0];
    s +=  '<span id="heading-'+id+'">'
    if (expandable) {
      s += 'Click to expand'
    }
    s += '</span>';
    s += "</h3>";
    s += "</div>";
  }
  if (expandable) {
    s += '<div class="panel-body" style="display: none" id="panel-'+id+'">';
  } else {
    s += '<div class="panel-body" id="panel-'+id+'">';
  }
  s += parseMarkdown(block.body);
  if (block.blocks) {
    block.blocks.forEach((subblock) => {
      s += panel(output_type, subblock, "danger", "line-chart");
    });
  }
  s += "</div>";
  s += "</div>";
  return s;
}

module.exports = {
  website: {
    assets: "./assets",
    css: [
      "panels.css",
    ],
    js: [
      "panels.js",
    ]
  },
  ebook: {
    assets: "./assets",
    css: [
      "ebook.css",
    ]
  },

  blocks: {
    // Block names that match Bootstrap classes
    panel: {
      process: function(block) {
        return panel(this.output.name, block, 'default');
      }
    },
    panel_primary: {
      process: function(block) {
        return panel(this.output.name, block, "primary");
      }
    },
    panel_success: {
      process: function(block) {
        return panel(this.output.name, block, "success");
      }
    },
    panel_warning: {
      process: function(block) {
        return panel(this.output.name, block, "warning");
      }
    },
    panel_danger: {
      process: function(block) {
        return panel(this.output.name, block, "danger");
      }
    },
    // Block names that match what we used in the SWC templates
    prereq: {
      process: function(block) {
        return panel(this.output.name, block, "warning", "rocket");
      }
    },
    callout: {
      process: function(block) {
        return panel(this.output.name, block, "primary", "info-circle");
      }
    },
    challenge: {
      blocks: ['solution'],
      process: function(block) {
        return panel(this.output.name, block, "success", "square-o");
      }
    },
    solution: {
      process: function(block) {
        return panel(this.output.name, block, "danger", "check-square-o", true);
      }
    },
    objectives: {
      process: function(block) {
        return panel(this.output.name, block, "warning", "line-chart");
      }
    },
    keypoints: {
      process: function(block) {
        return panel(this.output.name, block, "success", "key");
      }
    },
    discussion: {
      process: function(block) {
        return panel(this.output.name, block, "success", "bell", true);
      }
    }
  }
};
