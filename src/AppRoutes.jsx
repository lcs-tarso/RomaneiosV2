import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link, Outlet } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Suas rotas aqui, exemplo: */}
        {/* <Route path="/" element={<Login />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;