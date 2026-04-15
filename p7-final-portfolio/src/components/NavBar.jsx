/*
As a user, I can navigate your site. (10 points)
Acceptance criteria
There is a navigation UI that has links to all of the pages or sections.
When I click on a link in the navigation UI, I can view that page/section.
The navigation should appear in a consistent place across pages and is easy to use.

*/

import { useNavigate } from "react-router";

export const NavBar = () => {
    return (
        <>
        <div>Home</div>
        <div>Projects</div>
        <div>Skills</div>
        <div>Contact</div>
        
        </>

    );
};
