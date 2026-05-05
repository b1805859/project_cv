package com.hius.erms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tbt_items")
public class ItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "item_id", nullable = false, unique = true)
    private String itemId;
    private String name;
    private BigDecimal price;
    private String description;
    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createAt;
    @UpdateTimestamp
    private Timestamp updateAt;
    private String imgUrl;
    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    private CategoryEntity category;
}
