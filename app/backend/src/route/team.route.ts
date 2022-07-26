import { Router } from 'express';
import TeamCon from '../controller/teamCon';

const TeamsRoute = Router();
const teamCon = new TeamCon();

TeamsRoute.get('/', teamCon.getTeams.bind(teamCon));
TeamsRoute.get('/:id', teamCon.getIdTeam.bind(teamCon));

export default TeamsRoute;
