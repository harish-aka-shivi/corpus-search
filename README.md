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
This way we don't load the email it in memory and we just keep the reference.
- To prevent the whole data-set being loaded in the memory, It is possible to split the Trie into separate files where each file represent the words starting from that letter
For example,=> a.json will contain words like accent, able and b.json bypass. The splitting is not implemented yet.

- The file is chosen as the storage medium because of the constraint of using no database.

- The "search" function is implemented to give the expected result, but there is a bug and it is not working correctly. I could not fix that in the given time. The standard Trie is working properly.

- There can be an additional optimization that could be done, which is implementing an in-memory cache for most commonly used words.

- The level of depth for which it will return the result is fixed at 3 for now.