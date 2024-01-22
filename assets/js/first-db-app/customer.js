class Customer {

    DBOpenRequest = null;

    constructor(dbName, dbVersion) {

        this.dbName = dbName;
        this.dbVersion = dbVersion;

        if (!window.indexedDB) {
            window.alert(
                "Your browser doesn't support a stable version of IndexedDB. \
                Such and such feature will not be available."
            );
        }
    }

    /**
     * Populate the Customer database with an initial set of customer data
     * @param {[object]} customerData Data to add
     * @memberof Customer
     */
    initialLoad = () => {

        const DBOpenRequest = indexedDB.open(this.dbName, this.dbVersion);

        DBOpenRequest.onerror = (event) => {
            console.log(`initialLoad - Database error: ${event.target.errorCode} - ${event.target.message}`);
        };

        DBOpenRequest.onsuccess = (event) => {
            const db = event.target.result;
            console.log(`Database created: ${db.name}`);
        };

        DBOpenRequest.onupgradeneeded = (event) => {

            const db = event.target.result;
            const objectStore = db.createObjectStore('customers', { keyPath: 'userid' });

            objectStore.onerror = (event) => {

                console.log(`initialLoad - objectStore error: `, event.target.error.code,
                " - ", event.target.error.message);
            };

            // Create an index to search customers by name and email
            objectStore.createIndex('name', 'name', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });

            db.close();
        };
    }

    bulkAddCustomer = (customerData) => {

        const DBOpenRequest = indexedDB.open(this.dbName, this.dbVersion);

        DBOpenRequest.onerror = (event) => {

            console.log(`addCustomer - Database error: ${event.target.errorCode} - ${event.target.message}`);
        };

        DBOpenRequest.onsuccess = (event) => {

            const db = event.target.result;
            console.log('Add customer...');

            const transaction = db.transaction(["customers"], "readwrite");

            transaction.onerror = (event) => {

                console.log(`addCustomer - Transaction error: ${event.target.errorCode} - ${event.target.message}`);
            };

            const objectStore = transaction.objectStore("customers");

            // Populate the database with the initial set of rows
            customerData.forEach(function(customer) {
                objectStore.put(customer);
            });

            console.log('Customers added...');
        }

    }

    /**
     * Remove all rows from the database
     * @memberof Customer
     */
    removeAllRows = () => {

        const DBOpenRequest = indexedDB.open(this.dbName, this.dbVersion);

        DBOpenRequest.onerror = (event) => {
            console.log('removeAllRows - Database error: ', event.target.error.code, " - ", event.target.error.message);
        };

        DBOpenRequest.onsuccess = (event) => {

            const db = event.target.result;
            console.log('Deleting all customers...');

            const transaction = db.transaction(["customers"], "readwrite");

            transaction.onerror = (event) => {
                console.log('removeAllRows - Transaction error: ', event.target.error.code, " - ", event.target.error.message);
            };

            transaction.oncomplete = (event) => {
                console.log('All rows removed!');
            };

            const objectStore = txn.objectStore('customers');
            const getAllKeysRequest = objectStore.getAllKeys();

            getAllKeysRequest.onsuccess = (event) => {
                getAllKeysRequest.result.forEach(key => {
                    objectStore.delete(key);
                });
            }
        }
    }

}

export { Customer };