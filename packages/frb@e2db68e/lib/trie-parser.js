function makeParserFromTrie(e){var t={};return Object.keys(e.children).forEach(function(n){t[n]=makeParserFromTrie(e.children[n])}),function(n,i){return i=i||identity,function(r,a){return t[r]?t[r](n,function(e){return i(e)(r,a)}):n(e.value,i)(r,a)}}}function identity(e){return e}module.exports=makeParserFromTrie;