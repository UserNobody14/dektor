package com.ben.dektor

import com.ben.dektor.entities.Board
import com.ben.dektor.entities.CatalogThread
import com.ben.dektor.repositories.ThreadRepository
import com.github.paulcwarren.ginkgo4j.Ginkgo4jConfiguration
import com.github.paulcwarren.ginkgo4j.Ginkgo4jSpringRunner
import org.assertj.core.api.Assertions
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import javax.persistence.EntityManager

//import com.github.paulcwarren.ginkgo4j.;
//import javafx.application.Application;
@RunWith(Ginkgo4jSpringRunner::class)
@Ginkgo4jConfiguration(threads = 1)
@DataJpaTest(properties = ["spring.datasource.url=jdbc:h2:mem:testdb", "spring.content.fs.filesystemRoot=C:\\Users\\Benjamin Sobel\\IdeaProjects\\dektor\\angle-chan-server\\itemsStored\\"])
class DektorApplicationTests {
    @Autowired
    var entityManager: EntityManager? = null

    @Autowired
    var threadRepository: ThreadRepository? = null

    @Test
    fun whenFindById_thenReturnSameNumber() {
        // given
        val alex = CatalogThread(2, "alex", mutableListOf(), Board("b"))
        //		alex.setNumber(2);
        entityManager!!.persist(alex)
        entityManager!!.flush()

        // when
        val found = threadRepository!!.findById(alex.number!!).get()

        // then
        Assertions.assertThat(found.subject)
                .isEqualTo(alex.subject)
    }
}