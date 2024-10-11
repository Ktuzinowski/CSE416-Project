package bp;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/data")
public class DataResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getData() {
        // Hardcoded data; replace this with data from the database as needed
        String jsonData = "[{\"id\": 1, \"name\": \"Item 1\"}, {\"id\": 2, \"name\": \"Item 2\"}]";
        return jsonData;
    }
}
