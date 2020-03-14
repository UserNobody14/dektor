package com.ben.dektor;

import com.ben.dektor.entities.*;
import com.ben.dektor.repositories.MediaInfoRepository;
import com.ben.dektor.repositories.PostRepository;
import com.ben.dektor.repositories.ThreadRepository;
import com.ben.dektor.store.MediaStore;
import com.ben.dektor.store.ThumbnailStore;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import java.io.FileInputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;

@SpringBootApplication
//@ComponentScan("com.ben.dektor")
//@ComponentScan(basePackages = {"com.ben.dektor.rest", "com.ben.dektor.repositories", "com.ben.dektor.store", "com.ben.dektor.entities", "com.ben.dektor.security"})
public class DektorApplication {

    public static void main(String[] args) {
        SpringApplication.run(DektorApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(
            PostRepository postRepository,
            ThreadRepository threadRepository,
            ThumbnailStore thumbnailStore,
            MediaStore mediaStore,
            MediaInfoRepository mediaInfoRepository
	) {
        return (args) -> {
            // create a new user
            Post jbauer = new Post();
            MediaContainer mc = new MediaContainer();
            MediaInfo m = new MediaInfo();
            Thumbnail t = new Thumbnail();
            m.setLink(2);
            t.setLink(3);
            t.setMimeType("image/jpeg");
            t.setContentId("contentHear");
            m.setContentId("blah");
            m.setMimeType("image/jpeg");
            jbauer.setName("Anonymous");
            jbauer.setText("My post first");
            jbauer.setNumber(1);
            mc.setInfo(m);
            mc.setId(0L);
            mc.setThumbnail(t);

            jbauer.setMedia(Collections.singletonList(mc));

            CatalogThread thread = new CatalogThread();
            thread.setBoard("b");
            thread.setNumber(0);
            thread.setPosts(Collections.singletonList(jbauer));
            thread.setSubject("my Thread attempt");
            System.out.println(Path.of("angle-chan-client","src", "assets", "1573343926_1573341745591s.jpg").toString());

            // store profile picture
            mediaStore.setContent(m, new FileInputStream(
                    Path.of(Paths.get("").toAbsolutePath().getParent().toString() ,"angle-chan-client","src", "assets", "1573343926_1573341745591s.jpg").toString()));
			thumbnailStore.setContent(t, new FileInputStream(
                    Path.of(Paths.get("").toAbsolutePath().getParent().toString(), "angle-chan-client","src", "assets", "1573343887_1573340897764s.jpg").toString()));

            // save the user
//            mediaInfoRepository.save(m);
            postRepository.save(jbauer);
            threadRepository.save(thread);
        };
    }
}
