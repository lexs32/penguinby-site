import { Account, Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("69ed43c200209e96e456");

const account = new Account(client);
const databases = new Databases(client);

export { account, client, databases };
