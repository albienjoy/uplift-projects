import { ActivityList } from "../components/ActivityList";
import { Charts } from "../components/Charts";
import {SyncStrava} from "../components/SyncStrava";
import { Link } from "react-router";


export const Dashboard = () => {

    //this should include the activity cards
    return (
        <>
        <h1>Dashboard</h1>
        <Charts />
        <SyncStrava />

        <Link to="/profile/upload">
        <button>Upload new activity</button>
        </Link>

        <Link to="/races/list">
        <button>See races</button>
        </Link>

        <ActivityList />

        </>
    );
};
