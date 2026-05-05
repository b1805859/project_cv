package com.hius.erms.repository;

import com.hius.erms.entity.CategoryEntity;
import com.hius.erms.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {

    Optional<ItemEntity> findByItemId(String Id);

    Boolean existsByCategory(CategoryEntity category);
}
