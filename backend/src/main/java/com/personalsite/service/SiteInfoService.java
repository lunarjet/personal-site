package com.personalsite.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.personalsite.entity.SiteInfo;
import com.personalsite.mapper.SiteInfoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SiteInfoService {

    private final SiteInfoMapper siteInfoMapper;

    public Map<String, String> getAll() {
        List<SiteInfo> list = siteInfoMapper.selectList(null);
        Map<String, String> map = new HashMap<>();
        for (SiteInfo si : list) {
            map.put(si.getFieldKey(), si.getFieldValue());
        }
        return map;
    }

    @Transactional
    public void updateAll(Map<String, String> data) {
        for (Map.Entry<String, String> entry : data.entrySet()) {
            QueryWrapper<SiteInfo> wrapper = new QueryWrapper<>();
            wrapper.eq("field_key", entry.getKey());
            SiteInfo existing = siteInfoMapper.selectOne(wrapper);
            if (existing != null) {
                existing.setFieldValue(entry.getValue());
                siteInfoMapper.updateById(existing);
            } else {
                SiteInfo si = new SiteInfo();
                si.setFieldKey(entry.getKey());
                si.setFieldValue(entry.getValue());
                siteInfoMapper.insert(si);
            }
        }
    }
}
