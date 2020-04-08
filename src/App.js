/* eslint-disable no-loop-func */

// The storage of the corpus in Trie data structure should happen on server.
// On mobile we can store the words starting from the separate characters in separate files.
// So if the total character set is 26(assumption) => there will be 26 files and only one file should be in memory.
// we also need to cache the popular words this will be a separate file

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
Trie.prototype.insert = function insert(word) {
  let crawled = this.root;
  word.split('').forEach(letter => {
    if (!crawled.children[letter]) {
      crawled.children[letter] = new TrieNode();
      crawled = crawled.children[letter];
    }
  });
  crawled.isWordEnd = true;
};


// should happen on server,
// insert in trie root
Trie.prototype.insertEmail = function insert(word, { emailMemoryLocation, emailTitle }) {
  let crawled = this.root;
  word.split('').forEach(letter => {
    if (!crawled.children[letter]) {
      crawled.children[letter] = new TrieNode();
      crawled.associatedEmails.push({ emailMemoryLocation, emailTitle });
      crawled = crawled.children[letter];
    }
  });
  crawled.isWordEnd = true;
};

Trie.prototype.searchWord = function searchWord(word) {
  let crawled = this.root;
  word.split('').forEach(letter => {
    if (!crawled.children[letter]) {
      return false;
    }
    crawled = crawled.children[letter];
  });
  return crawled && crawled.isWordEnd;
};

Trie.prototype.search = function search(word) {
  let crawled = this.root;
  word.split('').forEach(letter => {
    if (!crawled.children[letter]) {
      return [];
    }
    crawled = crawled.children[letter];
  });
  console.log(crawled);
  const result = [];
  if (crawled) {
    let level = 3; // search for 3 level deep
    while (level > 0) {
      const arr = Object.keys(crawled);
      console.log(arr);
      arr.forEach(item => {
        result.push(crawled[item].associatedEmails);
      });
      level -= 1;
    }
  }
  return result;
};


const extendedTriesTest = () => {
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
    emails.forEach(({ emailTitle, emailContent, emailMemoryLocation }) => {
      emailContent.split(' ').forEach(word => {
        trie.insertEmail(word, { emailTitle, emailMemoryLocation });
      });
    });
  };

  const testExpect = (expect, output) => {
    if (expect === output) {
      console.log('test passed');
    } else {
      console.log('test failed');
    }
  };

  const trie = new Trie();
  putEmails(demoEmails, trie);
  console.log(trie.search('th').length, trie.search('th'));
  testExpect(trie.search('th').length, 0);
};

extendedTriesTest();

// tests
const tests = () => {
  const words = ['hot', 'a', 'not', 'answer', 'any', 'the',
    'what', 'take', 'there'];

  const trie = new Trie();

  const testExpect = (expect, output) => {
    if (expect === output) {
      console.log('test passed');
    } else {
      console.log('test failed');
    }
  };

  words.forEach(word => {
    trie.insert(word);
  });

  testExpect(trie.searchWord('the'), true);
  testExpect(trie.searchWord('there'), true);
  testExpect(trie.searchWord(''), false);
  testExpect(trie.searchWord('done'), false);
};

// tests();
