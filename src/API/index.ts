import PlayerType from "../types/Player";

export const PLAYERURL = `https://fsa-puppy-bowl.herokuapp.com/api/2302-acc-pt-web-pt-a/players`;
//const TEAMURL = `https://fsa-puppy-bowl.herokuapp.com/api/2302-acc-pt-web-pt-a/teams`;
// fetch players with api end point
//export the players
const validatedURL = (api_param: string, id_param: number|string) => {
    console.log(id_param);
    const validatedId = (id_param: number|string) => {
      const idPattern = new RegExp(/^\d{2}\d+$/);
      if (idPattern.test(String(id_param))) {
        return String(id_param);
      } else {
        throw new Error("Invalid ID: ");
      }
    };
    return id_param === "" ? api_param : api_param + "/" + validatedId(id_param);
  };

/*
  -For "GET"/retrieving all players call sendRequest(API_URL)
  -For "GET"/retrieving a single player call sendRequest(API, ID) including an id as a second argurment is equivalent to "API_URL/ID"
   
  -For "POST"/sending a player to the API endpoint call sendRequest(API,"",options) options should be modified to 

*/
 const sendRequest = async (api: string, id:string|number = "", options = {}) => {
    try {
      const req = await fetch(validatedURL(api, id), options);
      const resp = await req.json();
      return resp;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to fetch data");
    }
  };

 export const deleteRequest = async (id: string|number) => {
  
    try {
      await sendRequest(PLAYERURL, id, { method: "DELETE" });

    } catch (err) {
      console.error(
        `Whoops, trouble removing player #${id} from the roster!`,
        err
      );
    }
  };

export const addNewPlayer = async (data: PlayerType) => {
    console.log("Adding player");
    data.updatedAt = new Date().toISOString();
  
      const option =  {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      console.log(option);
      const req = await sendRequest(PLAYERURL, "",option);
      console.log(req);
  };

export default sendRequest;
