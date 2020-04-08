# corpus-search

# Reasoning
- The storage of the corpus in Trie data structure should happen on server.
- On mobile we can store the words starting from the separate characters in separate files.
- So if the total character set is 26(assumption) => there will be 26 files and only one file should be in memory.
- we also need to cache the popular words this will be a separate file

# Approach
- First implement the basic trie structure
- Make an extended feature with each TrieNode containing the list associated emails. An email is represented as
```
{
  emailTitle: ''
  emailContent: '',
  emailMemoryLocation: '',
},
```
This way we dont load it in memory
