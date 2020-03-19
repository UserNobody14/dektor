package com.ben.dektor

import com.ben.dektor.entities.*
import com.ben.dektor.repositories.BoardRepository
import com.ben.dektor.repositories.MediaInfoRepository
import com.ben.dektor.repositories.PostRepository
import com.ben.dektor.repositories.ThreadRepository
import com.ben.dektor.security.CaptchaSettings
import com.ben.dektor.store.MediaStore
import com.ben.dektor.store.ThumbnailStore
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import java.io.FileInputStream
import java.nio.file.Path
import java.nio.file.Paths

@EnableConfigurationProperties(CaptchaSettings::class)
@SpringBootApplication //@ComponentScan("com.ben.dektor")
//@ComponentScan(basePackages = {"com.ben.dektor.rest", "com.ben.dektor.repositories", "com.ben.dektor.store", "com.ben.dektor.entities", "com.ben.dektor.security"})
class DektorApplication {
    @Bean
    fun demo(
            postRepository: PostRepository,
            threadRepository: ThreadRepository,
            thumbnailStore: ThumbnailStore,
            mediaStore: MediaStore,
            mediaInfoRepository: MediaInfoRepository,
            boardRepository: BoardRepository
    ): CommandLineRunner {
        return CommandLineRunner { args: Array<String?>? ->
            // create a new user
            val m = MediaInfo(
                    2,
                    null,
                    null,
                    "contentHear",
                    null,
                    "image/jpeg")
            val t = Thumbnail(
                    3,
                    null,
                    null,
                    "blah",
                    null,
                    "image/jpeg")
            val mc = MediaContainer(
                    0,
                    m,
                    t,
                    null,
                    null,
                    null)
            var jbauer = Post(
                    1,
                    "Anonymous",
                    CatalogThread(0,
                            "null",
                            mutableListOf(),
                            Board("t")),
                    null,
                    "My post first",
                    mutableListOf(mc),
                    null)
//            jbauer
            val thread = CatalogThread(
                    0,
                    "my Thread attempt",
                    mutableListOf(),
                    Board("b"))
//            thread.setBoard("b")
//            thread.setNumber(0)
//            thread.setPosts(listOf(jbauer))
//            thread.setSubject("my Thread attempt")
//            println(Path.of("angle-chan-client", "src", "assets", "1573343926_1573341745591s.jpg").toString())

            // store profile picture
            mediaStore.setContent(m, FileInputStream(
                    Path.of(Paths.get("").toAbsolutePath().parent.toString(), "angle-chan-client", "src", "assets", "1573343926_1573341745591s.jpg").toString()))
            thumbnailStore.setContent(t, FileInputStream(
                    Path.of(Paths.get("").toAbsolutePath().parent.toString(), "angle-chan-client", "src", "assets", "1573343887_1573340897764s.jpg").toString()))

            // save the user
//            mediaInfoRepository.save(m);
//            postRepository.save(jbauer)
            boardRepository.save(Board("b"))
            threadRepository.save(thread)
                        postRepository.save(jbauer)
        }
    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            SpringApplication.run(DektorApplication::class.java, *args)
        }
    }
}