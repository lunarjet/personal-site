package com.personalsite.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("t_site_info")
public class SiteInfo {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String fieldKey;
    private String fieldValue;
}
