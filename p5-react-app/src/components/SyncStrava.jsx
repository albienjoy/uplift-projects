
export const SyncStrava = () => {

const connectStrava = () => {
  const clientId = "YOUR_CLIENT_ID";
  const redirectUri = "http://localhost:9876/api/strava/callback";

  const url = `https://www.strava.com/oauth/authorize
  ?client_id=${clientId}
  &response_type=code
  &redirect_uri=${redirectUri}
  &approval_prompt=force
  &scope=activity:read_all`;

  window.location.href = url;
};



    return (
        <div>
<button onClick={connectStrava}>
  Connect Strava
</button>

        </div>
    );
};
