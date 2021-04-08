package usc.cs310.ProEvento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import usc.cs310.ProEvento.model.UserGroup;
import usc.cs310.ProEvento.model.requestbody.UserGroupRequestBody;
import usc.cs310.ProEvento.service.UserGroupService;

import java.util.List;

@RestController
public class UserGroupController {
    @Autowired
    private UserGroupService userGroupService;

    @GetMapping("/api/group")
    public UserGroup getGroupById(@RequestParam long groupId) {
        UserGroup userGroup = userGroupService.getGroupById(groupId);
        return userGroup;
    }

    @GetMapping("/api/group/groups_by_name")
    public List<UserGroup> getGroupsByName(@RequestParam String name) {
        return userGroupService.getGroupsByName(name);
    }

    @GetMapping("/api/group/groups_by_member")
    public List<UserGroup> getGroupsByMember(@RequestParam long userId) {
        return userGroupService.getGroupsByMember(userId);
    }

    @GetMapping("/api/group/groups_by_founder")
    public List<UserGroup> getGroupsByFounder(@RequestParam long userId) {
        return userGroupService.getGroupsByFounder(userId);
    }

    @GetMapping("/api/group/all_groups")
    public List<UserGroup> GetAllGroups() {
        return userGroupService.getAllGroups();
    }

    @PostMapping("/api/group/create")
    public String createGroup(@RequestBody UserGroup userGroup) {
        if (userGroupService.createGroup(userGroup)) {
            return "success";
        }
        return "failure";
    }

    @PostMapping("/api/group/add_user")
    public String addUserToGroup(@RequestBody UserGroupRequestBody requestBody) {
        if (userGroupService.addUserToGroup(requestBody.userId, requestBody.groupId)) {
            return "success";
        }
        return "failure";
    }

    @PostMapping("/api/group/remove_user")
    public String removeUserToGroup(@RequestBody UserGroupRequestBody requestBody) {
        if (userGroupService.removeUserFromGroup(requestBody.userId, requestBody.groupId)) {
            return "success";
        }
        return "failure";
    }
}
