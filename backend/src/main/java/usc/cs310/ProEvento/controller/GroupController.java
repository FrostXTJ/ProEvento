package usc.cs310.ProEvento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import usc.cs310.ProEvento.model.Group;
import usc.cs310.ProEvento.model.requestbody.UserGroupRequestBody;
import usc.cs310.ProEvento.service.GroupService;

import java.util.List;

@RestController
public class GroupController {
    @Autowired
    private GroupService groupService;

    @GetMapping("/api/group")
    public Group getGroupById(@RequestParam long groupId) {
        Group group = groupService.getGroupById(groupId);
        return group;
    }

    @GetMapping("/api/group/groups_by_name")
    public List<Group> getGroupsByName(@RequestParam String name) {
        return groupService.getGroupsByName(name);
    }

    @GetMapping("/api/group/groups_by_member")
    public List<Group> getGroupsByMember(@RequestParam long userId) {
        return groupService.getGroupsByMember(userId);
    }

    @GetMapping("/api/group/groups_by_founder")
    public List<Group> getGroupsByFounder(@RequestParam long userId) {
        return groupService.getGroupsByFounder(userId);
    }

    @GetMapping("/api/group/all_groups")
    public List<Group> GetAllGroups() {
        return groupService.getAllGroups();
    }

    @PostMapping("/api/group/create")
    public String createGroup(@RequestBody Group group) {
        if (groupService.createGroup(group)) {
            return "success";
        }
        return "failure";
    }

    @PostMapping("/api/group/add_user")
    public String addUserToGroup(@RequestBody UserGroupRequestBody requestBody) {
        if (groupService.addUserToGroup(requestBody.userId, requestBody.groupId)) {
            return "success";
        }
        return "failure";
    }

    @PostMapping("/api/group/remove_user")
    public String removeUserToGroup(@RequestBody UserGroupRequestBody requestBody) {
        if (groupService.removeUserFromGroup(requestBody.userId, requestBody.groupId)) {
            return "success";
        }
        return "failure";
    }
}
