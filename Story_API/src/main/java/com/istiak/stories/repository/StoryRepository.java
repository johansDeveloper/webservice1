package com.istiak.stories.repository;

import com.istiak.stories.model.Story;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface StoryRepository extends CrudRepository<Story, Long> {

    @Query(getAllStoriesSorted)
    List<Story> getAllStoriesSorted(Pageable pageable);

    final String getAllStoriesSorted= "from Story order by publishedAt DESC";
}
