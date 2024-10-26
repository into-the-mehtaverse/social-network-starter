// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    const newID = this.currentID + 1;
    let user = {
      id: newID,
      name: name
    }
    this.users[newID] = user;
    this.follows[newID] = new Set ();
    this.currentID++
    return this.currentID;
  }

  getUser(userID) {
    if (this.users[userID] === undefined) return null;
    return this.users[userID]
  }

  follow(userID1, userID2) {
    if (this.users[userID2] === undefined) return false;
    this.follows[userID1].add(userID2);
    return true;
  }

  getFollows(userID) {
    return this.follows[userID];
  }

  getFollowers(userID) {

    let followers = new Set;

    for (let user in this.follows) {
      if (this.follows[user].has(userID)) {
        followers.add(Number(user))
      }
    }

    return followers;

  }

  getRecommendedFollows(userID, degrees) {
    const queue = [];
    const visited = new Set([userID]);
    const recommends = new Set();

    // Initialize queue with the start user and an empty path
    queue.push([userID]);

    while (queue.length > 0) {
      const path = queue.shift();
      const currentUser = path[path.length - 1];

      // If the path length is within the degrees, collect recommendations
      if (path.length > 1 && path.length <= degrees + 1) {
        for (let friend of this.follows[currentUser]) {
          // Only add if it's not the starting user and not a direct connection
          if (!visited.has(friend) && !this.follows[userID].has(friend)) {
            recommends.add(friend);
          }
        }
      }

      // Add unvisited friends to the queue
      for (let friend of this.follows[currentUser]) {
        if (!visited.has(friend)) {
          visited.add(friend);
          const newPath = path.concat(friend);
          if (newPath.length <= degrees + 1) {
            queue.push(newPath);
          }
        }
      }
    }

    return Array.from(recommends);
  }
}

module.exports = SocialNetwork;
