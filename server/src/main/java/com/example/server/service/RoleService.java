package com.example.server.service;

import com.example.server.dto.request.RoleRequest;
import com.example.server.dto.response.RoleResponse;
import com.example.server.entity.Role;
import com.example.server.mapper.RoleMapper;
import com.example.server.repository.RoleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoleService {
    RoleRepository roleRepository;
    RoleMapper roleMapper;

    public RoleResponse create(RoleRequest request) {
        Role role = roleMapper.toRole(request);
        Role savedRole = roleRepository.save(role);
        return roleMapper.toRoleResponse(savedRole);
    }

    public List<RoleResponse> getAll(){
        return roleRepository.findAll().stream().map(role -> roleMapper.toRoleResponse(role)).toList();
    }

    public void delete(String roleId) {
        roleRepository.deleteById(roleId);
    }

}
