package com.example.server.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserStatisticsResponse {
    long totalUsers;
    long verifiedUsers;
    long userCount;
    long advisorCount;
    long adminCount;
}
