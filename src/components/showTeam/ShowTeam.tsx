import React, { useEffect, useState } from "react";

function ShowTeam() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Retrieve teams data from localStorage
    const teamsJSON = localStorage.getItem("teams");
    if (teamsJSON) {
      const parsedTeams = JSON.parse(teamsJSON);
      setTeams(parsedTeams);
    }
  }, []);

  return (
    <div>
      {teams.map((team) => (
        <div key={team.id}>
          <h3>{team.name}</h3>
          <p>Player Count: {team.playerCount}</p>
          <p>Region: {team.region}</p>
          <p>Country: {team.country}</p>
        </div>
      ))}
    </div>
  );
}

export default ShowTeam;
