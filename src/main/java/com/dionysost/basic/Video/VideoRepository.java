package com.dionysost.basic.Video;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.dionysost.basic.Login.Member;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
    Optional<Video> findById(Long id);
    List<Video> findByNameContaining(String keyword);
    List<Video> findByMember(Member member);
    

    @Transactional
    default void updateVideoViewById(Long videoId) {
        findById(videoId).ifPresent(video -> {
            video.setView(video.getView() + 1);
            save(video);
        });
    }
}