package usc.cs310.ProEvento.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usc.cs310.ProEvento.dao.TagDao;
import usc.cs310.ProEvento.model.Tag;

import java.util.List;

@Service
public class TagService {
    @Autowired
    private TagDao tagDao;

    public List<Tag> getAllTags() {
        return tagDao.selectAllTags();
    }

    public Tag getTagById(long tagId) {
        return tagDao.selectTagById(tagId);
    }
}
