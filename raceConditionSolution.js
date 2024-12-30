The solution involves using Firebase's transaction capabilities to ensure atomic operations.  Transactions guarantee that the entire operation completes successfully or not at all, preventing race conditions.  In the provided code, the transaction increments the counter safely.  If another client modifies the counter during the transaction, the operation will retry until successful.

```javascript
// Get a reference to the database
const database = firebase.database();
const counterRef = database.ref('counter');

// Increment the counter using a transaction
counterRef.transaction(currentCount => {
  if (currentCount === null) {
    return 1;
  } else {
    return currentCount + 1;
  }
}, (error, committed, snapshot) => {
  if (error) {
    console.error('Transaction failed:', error);
  } else if (committed) {
    console.log('Counter successfully incremented:', snapshot.val());
  } else {
    console.log('Counter was not incremented (aborted).');
  }
});
```