package proyecto_f1.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import proyecto_f1.backend.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long>{

}
