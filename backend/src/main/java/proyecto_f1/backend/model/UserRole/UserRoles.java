package proyecto_f1.backend.model.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "userrolesview")
public class UserRoles {
    @Id
    @Column(name = "userid") // Match the column name from the view
    private Long userId;

    @Column(name = "username") // Match the column name from the view
    private String userName;

    @Column(name = "rolename") // Match the column name from the view
    private String roleName;

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}
