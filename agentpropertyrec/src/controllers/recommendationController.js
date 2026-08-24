import { driver } from "../config/db.js";
import {
  findCollaboratingAgents,
  findOwnerNetwork,
} from "../services/recommendationService.js";

function isConnectivityError(err) {
  const connectivityCodes = [
    "ServiceUnavailable",
    "SessionExpired",
    "ConnectionTimeout",
  ];
  return (
    connectivityCodes.includes(err.code) ||
    connectivityCodes.includes(err.name) ||    
    /ECONNREFUSED|ENOTFOUND|EAI_AGAIN/i.test(err.message || "")
  );
}

export async function getRecommendations(req, res) {
  const { agent, owner } = req.query;

  if (!agent && !owner) {
    return res.status(400).json({
      error: "Bad Request",
      message:
        "One query parameter: 'agent' or 'owner'. Example: /api/recommendations?owner=Eve&agent=Jill",
    });
  }

  // check database connectivity, so that if the database is unreachable, it can be
  //  handled gracefully without attempting to run queries.
  try {
    await driver.verifyConnectivity();
  } catch (err) {
    console.error("[Neo4j] Database unreachable:", err.message);
    return res.status(503).json({
      error: "Service Unavailable",
      message: "Unable to connect to the graph database. Please try again later.",
    });
  }

  const response = {};

  try {
    if (agent) {
      response.agent = agent;
      response.collaborators = await findCollaboratingAgents(agent);
    }

    if (owner) {
      response.owner = owner;
      response.network = await findOwnerNetwork(owner);
    }

    return res.status(200).json(response);
  } catch (err) {
    console.error("[Neo4j] Query execution failed:", err);

    if (isConnectivityError(err)) {
      return res.status(503).json({
        error: "Service Unavailable", 
        message: "Unable to connect to the graph database. Please try again later.",
      });
    }

    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred while executing the query.",
    });
  }
}
