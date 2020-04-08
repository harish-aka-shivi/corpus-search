/* eslint-disable no-loop-func */
function TrieNode() {
  this.children = {};
  this.isWordEnd = false;
  // emails.
  this.associatedEmails = [];
}

function Trie() {
  this.root = new TrieNode();
}

// should happen on server,
// insert in trie root
Trie.prototype.insertEmail = function insert(word, emailMemoryLocation) {
  let crawled = this.root;
  word.split('').forEach(letter => {
    if (!crawled.children[letter]) {
      crawled.children[letter] = new TrieNode();
      if (!crawled.associatedEmails.includes(emailMemoryLocation)) {
        crawled.associatedEmails.push(emailMemoryLocation);
      }
      crawled = crawled.children[letter];
    }
  });
  crawled.isWordEnd = true;
};

// This is the desired function which should return the list of associated email.
Trie.prototype.search = function search(word) {
  let crawled = this.root;
  // eslint-disable-next-line consistent-return
  word.split('').forEach(letter => {
    if (!crawled.children[letter]) {
      return [];
    }
    crawled = crawled.children[letter];
  });
  const result = [];
  if (crawled) {
    let level = 3; // search for 3 level deep
    while (level > 0) {
      const arr = Object.keys(crawled.children);
      arr.forEach(item => {
        result.push(crawled.children[item].associatedEmails);
      });
      level -= 1;
    }
  }
  return result;
};

const testExpect = (expect, output) => {
  if (expect === output) {
    console.log('test passed');
  } else {
    console.log('test failed');
  }
};

// Extended feature tests
const extendedTrieTest = () => {
  const demoEmails = [
    {
      emailTitle: 'Hello',
      emailContent: 'This is hello',
      emailMemoryLocation: '455fu33X3454',
    },
    {
      emailTitle: 'demo',
      emailContent: 'This is demo',
      emailMemoryLocation: '455fu33X3443',
    },
    {
      emailTitle: 'world',
      emailContent: 'This is world',
      emailMemoryLocation: '455fu33X3455',
    },
  ];

  // This function should have server access
  const putEmails = (emails, trie) => {
    emails.forEach(({ emailTitle, emailContent }) => {
      emailContent.split(' ').forEach(word => {
        trie.insertEmail(word, emailTitle);
      });
    });
  };

  const trie = new Trie();
  putEmails(demoEmails, trie);
  testExpect(trie.search('th').length, 0);
};

extendedTrieTest();
