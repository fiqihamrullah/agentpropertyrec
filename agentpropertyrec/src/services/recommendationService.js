import { driver } from '../config/db.js';

/**
 * Find primary agents which an agent has previously collaborated with.
 * (Agent)-[:SELL]->(Property)-[:CO_LIST_WITH]->(coAgent:Agent)
 */
export async function findCollaboratingAgents(name) {
  const session = driver.session();
  try {
    const result = await session.run(
      `MATCH (coAgent:Agent {name: $name})
             <-[:CO_LIST_WITH]-
             (p:Property)
             <-[:SELL]-
             (mainAgent:Agent)
       WHERE mainAgent <> coAgent
       RETURN DISTINCT mainAgent.name AS collaborator`,
      { name }
    );

    return result.records.map((record) => record.get("collaborator"));
  } finally {
    await session.close();
  }
}

/**
 * Find recommended agents and their network based on a search for
 * owner names whose properties have been sold.
 */
export async function findOwnerNetwork(name) {
  const session = driver.session();
  try {
    const result = await session.run(
      `MATCH (owner:PropertyOwner {name: $name})
             -[:OWN]->(property:Property)
             <-[:SELL]-
             (agent:Agent)
       MATCH path =
             (agent)
             <-[:CO_LIST_WITH]-
             (:Property)
             <-[:SELL]-
             (networkAgent:Agent)
       RETURN DISTINCT
           agent.name AS sellingAgent,
           networkAgent.name AS recommendedAgent 
      `,
      { name }
    );

    return result.records.map((record) => {   
      return {
        sellingAgent: record.get("sellingAgent"),
        recommendedAgent: record.get("recommendedAgent")
      };
    });
  } finally {
    await session.close();
  }
}
