package usc.cs310.ProEvento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import usc.cs310.ProEvento.model.Tag;
import usc.cs310.ProEvento.service.TagService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping("/api/tag/all_tags")
    public List<Tag> getAllTags() {
        return tagService.getAllTags();
    }

    @GetMapping("/api/tag")
    public Tag getTagById(@RequestParam("tag_id") long tagId,
                          HttpServletRequest request,
                          HttpServletResponse response) {
        Tag tag = tagService.getTagById(tagId);
        if (tag == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return tag;
    }
}
