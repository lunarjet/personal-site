package com.personalsite.controller;

import com.personalsite.service.SiteInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/site-info")
@RequiredArgsConstructor
public class SiteInfoController {

    private final SiteInfoService siteInfoService;

    /** 获取全部站点信息 */
    @GetMapping
    public Map<String, Object> getAll() {
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("data", siteInfoService.getAll());
        return result;
    }

    /** 批量更新站点信息 */
    @PutMapping
    public Map<String, Object> update(@RequestBody Map<String, String> data) {
        siteInfoService.updateAll(data);
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "保存成功");
        return result;
    }
}
