import { driver } from '../config/db';

async function seed() {
    const session = driver.session();

    try {
        await session.run(`
            // Agents
                    CREATE
                        (a1:Agent {
                            name: 'Jill',
                            sex: 'Female',
                            phone_number: '081234567001'
                        }),
                        (a2:Agent {
                            name: 'Leon',
                            sex: 'Male',
                            phone_number: '081234567002'
                        }),
                        (a3:Agent {
                            name: 'Billy',
                            sex: 'Male',
                            phone_number: '081234567003'
                        })
             `);

          await session.run(`
            // Properties
            CREATE
                (p1:Property {
                    title: 'Modern House in Palembang'
                }),
                (p2:Property {
                    title: 'Luxury Apartment in Palembang'
                }),
                (p3:Property {
                    title: 'Family House in Lahat'
                })
        `);
             

        await session.run(`
            // Property Owners
            CREATE
                (o1:PropertyOwner {
                    name: 'David'
                }),
                (o2:PropertyOwner {
                    name: 'Eve'
                })
        `);

        await session.run(`
            // RELATIONSHIPS 
            MATCH
                (jill:Agent {name: 'Jill'}),
                (leon:Agent {name: 'Leon'}),
                (billy:Agent {name: 'Billy'}),
                (p1:Property {title: 'Modern House in Palembang'}),
                (p2:Property {title: 'Luxury Apartment in Palembang'}),
                (p3:Property {title: 'Family House in Lahat'}),
                (david:PropertyOwner {name: 'David'}),
                (eve:PropertyOwner {name: 'Eve'})

            CREATE
                (jill)-[:SELL]->(p1),
                (leon)-[:SELL]->(p2),
                (billy)-[:SELL]->(p3),

                (p1)-[:CO_LIST_WITH]->(leon),
                (p2)-[:CO_LIST_WITH]->(billy),                
                (p1)-[:CO_LIST_WITH]->(billy),
                (p2)-[:CO_LIST_WITH]->(jill),
                (p3)-[:CO_LIST_WITH]->(jill),

                (david)-[:OWN]->(p1),
                (eve)-[:OWN]->(p2),
                (eve)-[:OWN]->(p3)
        `);
      
        console.log("Database successfully seeded!");
    } catch (error) {
        console.error("Seeding failed:", error);
    } finally {
        await session.close();
        await driver.close();
    }
}

seed();