package com.personalsite.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.personalsite.entity.Message;
import com.personalsite.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    /** 提交留言 */
    @PostMapping
    public Map<String, Object> submit(@RequestBody Message message) {
        Message saved = messageService.submit(message);
        return ok(saved);
    }

    /** 查询全部留言 */
    @GetMapping
    public Map<String, Object> list() {
        List<Message> list = messageService.list();
        return ok(list);
    }

    /** 分页查询 */
    @GetMapping("/page")
    public Map<String, Object> page(
            @RequestParam(defaultValue = "1") long current,
            @RequestParam(defaultValue = "10") long size) {
        Page<Message> page = messageService.page(current, size);
        return ok(page);
    }

    /** 删除留言 */
    @DeleteMapping("/{id}")
    public Map<String, Object> delete(@PathVariable Long id) {
        boolean ok = messageService.delete(id);
        Map<String, Object> result = new HashMap<>();
        result.put("success", ok);
        result.put("message", ok ? "删除成功" : "留言不存在");
        return result;
    }

    private Map<String, Object> ok(Object data) {
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("data", data);
        return result;
    }
}
