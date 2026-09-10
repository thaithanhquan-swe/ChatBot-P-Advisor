package com.example.server.mapper;

import com.example.server.dto.request.UserRegisterRequest;
import com.example.server.dto.request.UserUpdateRequest;
import com.example.server.dto.response.UserResponse;
import com.example.server.dto.response.CurrentUserResponse;
import com.example.server.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "firebaseUid", ignore = true)
    User toUser(UserRegisterRequest request);

    @Mapping(target = "created_at", source = "createdAt")
    @Mapping(target = "updated_at", source = "updatedAt")
    UserResponse toUserResponse (User user);

    CurrentUserResponse toCurrentUserResponse(User user);

    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "firebaseUid", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
