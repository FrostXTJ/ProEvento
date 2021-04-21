import { PROEVENTO_BACKEND_SERVER } from "@env";

const defaultOnSuccessCallback = data => {
  console.log(data);
};

const defaultOnFailureCallback = error => {
  console.warn(error);
};

export const testConnection = (
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(`${PROEVENTO_BACKEND_SERVER}/api/test`)
    .then(response => response.text())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const login = (
  body,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(`${PROEVENTO_BACKEND_SERVER}/api/account/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const register = (
  body,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(`${PROEVENTO_BACKEND_SERVER}/api/account/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const changePassword = (
  body,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(`${PROEVENTO_BACKEND_SERVER}/api/account/change_password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => response.text())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const searchUserById = (
  userId,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(
    `${PROEVENTO_BACKEND_SERVER}/api/user?` +
      new URLSearchParams({
        userId: userId,
      })
  )
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const searchUsersByUsername = (
  username,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(
    `${PROEVENTO_BACKEND_SERVER}/api/user/users_by_name?` +
      new URLSearchParams({
        username: username,
      })
  )
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const getFollowers = (
  userId,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(
    `${PROEVENTO_BACKEND_SERVER}/api/user/followers?` +
      new URLSearchParams({
        userId: userId,
      })
  )
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const getFollowing = (
  userId,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(
    `${PROEVENTO_BACKEND_SERVER}/api/user/following?` +
      new URLSearchParams({
        userId: userId,
      })
  )
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const follow = (
  body,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(`${PROEVENTO_BACKEND_SERVER}/api/user/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => response.text())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const unfollow = (
  body,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(`${PROEVENTO_BACKEND_SERVER}/api/user/unfollow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => response.text())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const getAllTags = (
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(`${PROEVENTO_BACKEND_SERVER}/api/tag/all_tags`)
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const getAllEvents = (
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(`${PROEVENTO_BACKEND_SERVER}/api/event/all_events`)
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const searchEventById = (
  eventId,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(
    `${PROEVENTO_BACKEND_SERVER}/api/event?` +
      new URLSearchParams({
        eventId: eventId,
      })
  )
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const searchEventsByName = (
  name,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(
    `${PROEVENTO_BACKEND_SERVER}/api/event/events_by_name?` +
      new URLSearchParams({
        name: name,
      })
  )
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const getUserRegisteredEvents = (
  userId,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(
    `${PROEVENTO_BACKEND_SERVER}/api/event/user_registered_events?` +
      new URLSearchParams({
        userId: userId,
      })
  )
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const getUserHostEvents = (
  userId,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(
    `${PROEVENTO_BACKEND_SERVER}/api/event/user_host_events?` +
      new URLSearchParams({
        userId: userId,
      })
  )
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const registerEvent = (
  body,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(`${PROEVENTO_BACKEND_SERVER}/api/event/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => response.text())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const unregisterEvent = (
  body,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(`${PROEVENTO_BACKEND_SERVER}/api/event/unregister`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => response.text())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const hostEvent = (
  body,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(`${PROEVENTO_BACKEND_SERVER}/api/event/host`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => response.text())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const startEvent = (
  body,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(`${PROEVENTO_BACKEND_SERVER}/api/event/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => response.text())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const endEvent = (
  body,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(`${PROEVENTO_BACKEND_SERVER}/api/event/end`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => response.text())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const joinEvent = (
  body,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(`${PROEVENTO_BACKEND_SERVER}/api/event/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => response.text())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const leaveEvent = (
  body,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(`${PROEVENTO_BACKEND_SERVER}/api/event/leave`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => response.text())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const sendInvitation = (
  body,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  console.log(JSON.stringify)
  fetch(`${PROEVENTO_BACKEND_SERVER}/api/invitation/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => response.text())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const getAllGroups = (
    onSuccess = defaultOnSuccessCallback,
    onFailure = defaultOnFailureCallback
) => {
  fetch(
      `${PROEVENTO_BACKEND_SERVER}/api/group/all_groups`)
      .then(response => response.json())
      .then(data => onSuccess(data))
      .catch(error => onFailure(error));
};

export const getGroupsByFounder = (
  userId,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
fetch(
    `${PROEVENTO_BACKEND_SERVER}/api/group/groups_by_founder?` +
    new URLSearchParams({
      userId: userId,
    })
)
  .then(response => response.json())
  .then(data => onSuccess(data))
  .catch(error => onFailure(error));
};


export const getGroupsByMember = (
  userId,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
fetch(
    `${PROEVENTO_BACKEND_SERVER}/api/group/groups_by_member?` +
    new URLSearchParams({
      userId: userId,
    })
)
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};


export const getEventNotification = (
    userId,
    onSuccess = defaultOnSuccessCallback,
    onFailure = defaultOnFailureCallback
) => {
  fetch(
      `${PROEVENTO_BACKEND_SERVER}/api/event_notification/by_receiver_id?` +
      new URLSearchParams({
        userId: userId,
      })
  )
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const getFollowNotification = (
    userId,
    onSuccess = defaultOnSuccessCallback,
    onFailure = defaultOnFailureCallback
) => {
  fetch(
      `${PROEVENTO_BACKEND_SERVER}/api/follow_notification/by_receiver_id?` +
      new URLSearchParams({
        userId: userId,
      })
  )
      .then(response => response.json())
      .then(data => onSuccess(data))
      .catch(error => onFailure(error));
};

export const createGroup = (
  body,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(`${PROEVENTO_BACKEND_SERVER}/api/group/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => response.text())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};


export const sendGroupRequest = (
  body,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(`${PROEVENTO_BACKEND_SERVER}/api/group_notification/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => response.text())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};

export const getGroupsByName = (
  name,
  onSuccess = defaultOnSuccessCallback,
  onFailure = defaultOnFailureCallback
) => {
  fetch(
    `${PROEVENTO_BACKEND_SERVER}/api/group/groups_by_name?` +
    new URLSearchParams({
      name: name,
    })
)
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(error => onFailure(error));
};
export const getGroupNotification = (
    userId,
    onSuccess = defaultOnSuccessCallback,
    onFailure = defaultOnFailureCallback
) => {
  fetch(
      `${PROEVENTO_BACKEND_SERVER}/api/group_notification/by_receiver_id?` +
      new URLSearchParams({
        userId: userId,
      })
  )
      .then(response => response.json())
      .then(data => onSuccess(data))
      .catch(error => onFailure(error));
};

export const addUserToGroup = (
    body,
    onSuccess = defaultOnSuccessCallback,
    onFailure = defaultOnFailureCallback
) => {
  fetch(`${PROEVENTO_BACKEND_SERVER}/api/group/add_user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
      .then(response => response.text())
      .then(data => onSuccess(data))
      .catch(error => onFailure(error));
};

export const removeFollowNotification = (
    body,
    onSuccess = defaultOnSuccessCallback,
    onFailure = defaultOnFailureCallback
) => {
  fetch(
      `${PROEVENTO_BACKEND_SERVER}/api/follow_notification/remove_receiver`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
      .then(response => response.json())
      .then(data => onSuccess(data))
      .catch(error => onFailure(error));
};

export const removeGroupNotification = (
    body,
    onSuccess = defaultOnSuccessCallback,
    onFailure = defaultOnFailureCallback
) => {
  fetch(
      `${PROEVENTO_BACKEND_SERVER}/api/group_notification/remove_receiver`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
      .then(response => response.json())
      .then(data => onSuccess(data))
      .catch(error => onFailure(error));
};