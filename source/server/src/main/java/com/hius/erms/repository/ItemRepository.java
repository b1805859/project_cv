package com.hius.erms.repository;

import com.hius.erms.entity.CategoryEntity;
import com.hius.erms.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {

    Optional<ItemEntity> findByItemId(String id);

    Boolean existsByCategory(CategoryEntity category);

    long countByCategory(CategoryEntity category);

    List<ItemEntity> findByCategory(CategoryEntity category);

    @Query("SELECT i FROM ItemEntity i WHERE " +
           "(:keyword IS NULL OR LOWER(i.name) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
           "(:categoryId IS NULL OR i.category.categoryId = :categoryId) AND " +
           "(:brand IS NULL OR LOWER(i.brand) = LOWER(:brand))")
    List<ItemEntity> searchItems(
            @Param("keyword") String keyword,
            @Param("categoryId") String categoryId,
            @Param("brand") String brand
    );

    List<ItemEntity> findTop6ByOrderBySoldDesc();

    List<ItemEntity> findByIsHotTrue();

    List<ItemEntity> findByIsNewTrue();
}
