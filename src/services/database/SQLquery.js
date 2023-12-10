import * as SQLite from 'expo-sqlite';
import md5 from 'md5';

class HandlerDB {

	constructor(navigation) {
		this.navigation = navigation;
	}

	handle(params) {
		
        this.getUserSQL(params)
        .then(localUser => {
            
        })
        .catch(error => {
            reject('Error to get BD Local - '+error);
        });
			
	}

	saveUserSQL = (data) =>  {
		return new Promise((resolve, reject) => {
			SQLiteHandler.openDb('intec')
			.then(open => {
				// console.log(open);
				if (open) {
					SQLiteHandler.db.transaction(async (tx) => {	
						var insert =`INSERT INTO users_crm (session,date_init,user_id,user_name,user_is_admin,user_default_dateformat) VALUES (
							'${data.session}',
							'${this.curDate(new Date())}',
							'${data.user_id}',
							'${data.user_name}',
							 ${data.user_is_admin},
							'${data.user_default_dateformat}'
						);`;		
						console.log('insert: ', insert);
						
						tx.executeSql(insert, [], (tx, results) => {
							console.log('Insert exitoso', results);
						}, (error) => {
							console.error('Error Insert User - ', error);
						});

						tx.executeSql('COMMIT;');
						resolve('Transacción completada');
					});
				}
			})
			.catch(error => {
				// console.log('Error al ejecutar consultas SQL: ' + error);
				reject('Error al ejecutar consultas SQL: ' + error);
			});
		});
	}

	getUserSQL = (username, password) => {
		return new Promise((resolve, reject) => {
			const db = SQLite.openDatabase('intec.db');
			const query = `SELECT * FROM users_crm WHERE user_name = '${username}' `; // AND session = '${md5(password)}' hay que quitar el hash...
			console.log(query);
			db.transaction(tx => {
				tx.executeSql(query, [], (txObj, resultSet) => {
					console.log('resultSet: ', JSON.stringify(resultSet));
					if (resultSet.rows.length > 0) {						
						resolve(resultSet.rows._array[0]);
					} else {
						resolve(null);
					}
				}, (txObj, error) => {
					reject('Error Select User - ', error);
				});
			});
		});
	};


    // SQLiteHandler.openDb('')
    // .then(open => {
    //     if (open) {
    //         SQLiteHandler.db.transaction(async (tx) => {
    //             var insert =`INSERT INTO orders_crm (${columns}) VALUES (${values});`;		
    //             // var insert =`INSERT INTO orders (id,name,case_number) VALUES ("5555","orden de prueba","1");`;
    //             console.log('insert: ', insert);
                
    //             tx.executeSql(insert, [], (tx, results) => {
    //                 console.log('Insert exitoso', results);
    //             }, (error) => {
    //                 console.error('Error en la inserción', error);
    //             });

    //             tx.executeSql('COMMIT;');

    //             this.getOrders()
    //             .then(orders => {
    //                 resolve(orders);
    //             })
    //             .catch(error => {
    //                 console.log('Error Select Orders - ' + error);
    //                 reject('Error Select Orders - ' + error);
    //             });
    //         });
    //     }
    // })
    // .catch(error => {
    //     console.log('Error al ejecutar consultas SQL: ' + error);
    //     // reject('Error al ejecutar consultas SQL: ' + error);
    // });


	curDate = (date) => {
		var year = date.getFullYear();
		var month = String(date.getMonth() + 1).padStart(2, '0');
		var day = String(date.getDate()).padStart(2, '0');
		var hours = String(date.getHours()).padStart(2, '0');
		var minutes = String(date.getMinutes()).padStart(2, '0');
		var seconds = String(date.getSeconds()).padStart(2, '0');
		var formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
		// console.log(formattedDate);
		return formattedDate;
	}
}

export default new UsersController();