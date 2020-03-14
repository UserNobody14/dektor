package com.ben.dektor;

import com.ben.dektor.entities.CatalogThread;
import com.ben.dektor.repositories.ThreadRepository;
import com.github.paulcwarren.ginkgo4j.Ginkgo4jConfiguration;
import com.github.paulcwarren.ginkgo4j.Ginkgo4jSpringRunner;
//import com.github.paulcwarren.ginkgo4j.;
//import javafx.application.Application;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.EntityManager;

import static org.assertj.core.api.Assertions.*;

@RunWith(Ginkgo4jSpringRunner.class)
@Ginkgo4jConfiguration(threads=1)
@DataJpaTest(properties = {"spring.datasource.url=jdbc:h2:mem:testdb",
"spring.content.fs.filesystemRoot=C:\\Users\\Benjamin Sobel\\IdeaProjects\\dektor\\angle-chan-server\\itemsStored\\"})
public class DektorApplicationTests {

	@Autowired
	EntityManager entityManager;

	@Autowired
	ThreadRepository threadRepository;

	@Test
	public void whenFindById_thenReturnSameNumber() {
		// given
		CatalogThread alex = new CatalogThread(2, "alex", "b");
//		alex.setNumber(2);
		entityManager.persist(alex);
		entityManager.flush();

		// when
		CatalogThread found = threadRepository.findById(alex.getNumber()).get();

		// then
		assertThat(found.getSubject())
				.isEqualTo(alex.getSubject());
	}

}
